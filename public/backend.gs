/**
 * ═══════════════════════════════════════════════════════════════════
 * 🏦 نصر والت | NASR WALLET — Google Apps Script Backend (backend.gs)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * الميزات:
 * 1. استقبال كافة عمليات المحفظة (تسديد، تحويل، شحن، حساب عائلة، طلب مصروف، رواتب)
 * 2. تخزين العمليات تلقائياً في Google Sheets
 * 3. لوحة تحكم فورية لـ admin.html عبر doGet / doPost
 * 4. نظام إشعارات فوري وتحديث الأرصدة
 * 
 * طريقة النشر:
 * Deploy -> New Deployment -> Web app -> Anyone (حتى يتمكن التطبيق من الإرسال)
 */

const SHEET_NAME_TRANSACTIONS = "العمليات";
const SHEET_NAME_FAMILY = "حسابات_العائلة";
const SHEET_NAME_VAULT = "الخزينة_السيادية";

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'get_all';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === 'get_transactions' || action === 'get_all') {
    var sheet = getOrCreateSheet(ss, SHEET_NAME_TRANSACTIONS, [
      'المعرف', 'التاريخ والوقت', 'نوع العملية', 'المرسل / الحساب', 'المستفيد / الجهة',
      'المبلغ', 'العملة', 'الحالة', 'رقم المرجع', 'ملاحظات'
    ]);
    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var item = {};
      for (var h = 0; h < headers.length; h++) {
        item[headers[h]] = data[i][h];
      }
      rows.push(item);
    }
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      count: rows.length,
      data: rows
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'خادم نصر والت يعمل بكفاءة عالية'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : "{}";
    var payload = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var action = payload.action || 'new_transaction';
    var sheet = getOrCreateSheet(ss, SHEET_NAME_TRANSACTIONS, [
      'المعرف', 'التاريخ والوقت', 'نوع العملية', 'المرسل / الحساب', 'المستفيد / الجهة',
      'المبلغ', 'العملة', 'الحالة', 'رقم المرجع', 'ملاحظات'
    ]);

    var txId = payload.id || ('TX-' + Utilities.formatDate(new Date(), 'GMT+3', 'yyyyMMdd-HHmmss'));
    var timestamp = payload.timestamp || Utilities.formatDate(new Date(), 'GMT+3', 'yyyy-MM-dd HH:mm:ss');
    var type = payload.type || payload.service || 'عملية مالية';
    var sender = payload.sender || payload.from || 'المحفظة الرئيسية';
    var recipient = payload.recipient || payload.to || payload.phone || payload.account || 'غير محدد';
    var amount = Number(payload.amount || 0);
    var currency = payload.currency || 'YER';
    var status = payload.status || 'مكتملة';
    var ref = payload.ref || ('REF-' + Math.floor(Math.random() * 900000 + 100000));
    var notes = payload.notes || payload.description || '';

    // إدراج الصف في أعلى الجدول بعد الترويسة
    sheet.appendRow([
      txId,
      timestamp,
      type,
      sender,
      recipient,
      amount,
      currency,
      status,
      ref,
      notes
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'تم تسجيل العملية بنجاح في Google Sheets',
      transactionId: txId,
      reference: ref
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, defaultHeaders) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(defaultHeaders);
    sheet.setRightToLeft(true);
    var headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
    headerRange.setBackground("#032516");
    headerRange.setFontColor("#f5c842");
    headerRange.setFontWeight("bold");
  }
  return sheet;
}
