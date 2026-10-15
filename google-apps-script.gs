/**
 * Nhận dữ liệu form landing page iPOS và ghi vào Google Sheet.
 * Cách dùng: xem HUONG_DAN.md
 */

// Email nhận thông báo khi có khách đăng ký (để trống "" nếu không cần)
const NOTIFY_EMAIL = "";

const HEADERS = [
  "Thời gian", "Họ và tên", "Số điện thoại", "Tỉnh/Thành", "Mô hình kinh doanh",
  "Liên hệ qua", "Nhu cầu", "Nguồn khách", "Hình thức", "Chiến dịch",
  "Từ khóa", "Mẫu quảng cáo", "Trang đăng ký",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    const s = v => String(v || "").slice(0, 1000);
    sheet.appendRow([
      new Date(), s(d.name), "'" + s(d.phone), s(d.city), s(d.model),
      s(d.channel), s(d.note), s(d.utm_source), s(d.utm_medium), s(d.utm_campaign),
      s(d.utm_term), s(d.utm_content), s(d.page),
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL,
        "[iPOS] Khách đăng ký tư vấn: " + s(d.name) + " - " + s(d.phone),
        "Họ tên: " + s(d.name) + "\nSĐT: " + s(d.phone) + "\nTỉnh/Thành: " + s(d.city) +
        "\nMô hình: " + s(d.model) + "\nLiên hệ qua: " + s(d.channel) + "\nNhu cầu: " + s(d.note));
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
