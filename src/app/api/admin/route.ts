import { NextResponse } from "next/server";
import {
  verifyAdminAuth,
  getDatabaseOverview,
  listAllUsers,
  updateUser,
  deleteUser,
  createDirectUser,
  listAllClasses,
  upsertClass,
  deleteClass,
  listAllTutorApplications,
  reviewTutorDirect,
  listStorageObjects,
  deleteStorageObject,
  listAllRedemptions,
  rawTableQuery,
  rawTableInsert,
  rawTableUpdate,
  rawTableDelete,
  getSiteSettings,
  updateSiteSettings,
} from "@/lib/server/admin";
import { PlatformError } from "@/lib/platform";

function fail(error: unknown) {
  if (error instanceof PlatformError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("Admin API Error:", error);
  const msg = error instanceof Error ? error.message : "Thao tác quản trị thất bại.";
  return NextResponse.json({ error: msg }, { status: 500 });
}

export async function GET(request: Request) {
  try {
    const auth = await verifyAdminAuth(request);
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab") || "overview";

    switch (tab) {
      case "overview":
      case "stats": {
        const data = await getDatabaseOverview();
        return NextResponse.json({ auth, ...data });
      }
      case "users": {
        const users = await listAllUsers();
        return NextResponse.json({ users });
      }
      case "classes": {
        const classes = await listAllClasses();
        return NextResponse.json({ classes });
      }
      case "tutors": {
        const applications = await listAllTutorApplications();
        return NextResponse.json({ applications });
      }
      case "storage": {
        const files = await listStorageObjects();
        return NextResponse.json({ files });
      }
      case "redemptions": {
        const redemptions = await listAllRedemptions();
        return NextResponse.json({ redemptions });
      }
      case "raw_db": {
        const table = searchParams.get("table") || "users";
        const limit = Number(searchParams.get("limit") || 50);
        const offset = Number(searchParams.get("offset") || 0);
        const result = await rawTableQuery(table, limit, offset);
        return NextResponse.json(result);
      }
      case "settings": {
        const settings = await getSiteSettings();
        return NextResponse.json({ settings });
      }
      default:
        return NextResponse.json({ error: "Tab không hợp lệ" }, { status: 400 });
    }
  } catch (error) {
    return fail(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminAuth(request);
    const body = await request.json().catch(() => ({}));
    const action = body.action;

    switch (action) {
      case "verify": {
        return NextResponse.json({ success: true, auth });
      }

      // Users
      case "update_user": {
        if (!body.userId) throw new PlatformError("Thiếu userId cần sửa.", 400);
        const adminName = (auth.user as any)?.name || (auth.user as any)?.user_metadata?.full_name || "Huỳnh Công Thành";
        const updated = await updateUser(body.userId, body.updates || {}, adminName);
        return NextResponse.json({ success: true, user: updated });
      }

      case "delete_user": {
        if (!body.userId) throw new PlatformError("Thiếu userId cần xóa.", 400);
        const res = await deleteUser(body.userId);
        return NextResponse.json(res);
      }

      case "create_user": {
        if (!body.email || !body.name) throw new PlatformError("Email và Tên là bắt buộc.", 400);
        const res = await createDirectUser(body);
        return NextResponse.json({ success: true, ...res });
      }

      // Classes
      case "upsert_class": {
        if (!body.classData || !body.classData.title) {
          throw new PlatformError("Tiêu đề lớp học không được để trống.", 400);
        }
        const saved = await upsertClass(body.classData);
        return NextResponse.json({ success: true, classSession: saved });
      }

      case "delete_class": {
        if (!body.classId) throw new PlatformError("Thiếu classId cần xóa.", 400);
        const res = await deleteClass(body.classId);
        return NextResponse.json(res);
      }

      // Tutors
      case "review_tutor": {
        if (!body.applicationId || !body.decision) {
          throw new PlatformError("Thiếu mã hồ sơ hoặc quyết định duyệt.", 400);
        }
        const res = await reviewTutorDirect(body.applicationId, body.decision, body.feedback || "");
        return NextResponse.json(res);
      }

      // Storage
      case "delete_file": {
        if (!body.fileName) throw new PlatformError("Thiếu tên tệp cần xóa.", 400);
        const res = await deleteStorageObject(body.fileName);
        return NextResponse.json(res);
      }

      // Raw DB mutations
      case "raw_insert": {
        if (!body.table || !body.record) throw new PlatformError("Thiếu tên bảng hoặc dữ liệu.", 400);
        const res = await rawTableInsert(body.table, body.record);
        return NextResponse.json({ success: true, data: res });
      }

      case "raw_update": {
        if (!body.table || !body.keyColumn || body.keyValue === undefined || !body.record) {
          throw new PlatformError("Dữ liệu cập nhật bảng không đầy đủ.", 400);
        }
        const res = await rawTableUpdate(body.table, body.keyColumn, body.keyValue, body.record);
        return NextResponse.json({ success: true, data: res });
      }

      case "raw_delete": {
        if (!body.table || !body.keyColumn || body.keyValue === undefined) {
          throw new PlatformError("Thiếu thông tin khóa chính để xóa dòng.", 400);
        }
        const res = await rawTableDelete(body.table, body.keyColumn, body.keyValue);
        return NextResponse.json(res);
      }

      // Site Settings
      case "update_settings": {
        const updated = await updateSiteSettings(body.settings || {});
        return NextResponse.json({ success: true, settings: updated });
      }

      default:
        throw new PlatformError(`Action '${action}' không được hỗ trợ.`, 400);
    }
  } catch (error) {
    return fail(error);
  }
}
