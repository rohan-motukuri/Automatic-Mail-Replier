function getPayloadBreakdown (mail) {
    const payload = mail.payload;
    const headers = payload.headers;

    const from        = headers.find(header => header.name.toLowerCase() === 'from')?.value || '';
    const to          = headers.find(header => header.name.toLowerCase() === 'to')?.value || '';
    const subject     = headers.find(header => header.name.toLowerCase() === 'subject')?.value || '';
    const messageId   = headers.find(header => header.name.toLowerCase() === 'message-id')?.value || '';
    const contentType = headers.find(header => header.name.toLowerCase() === 'content-type')?.value || '';
  
    return {
      from,
      to,
      subject,
      messageId,
      contentType,
    };
}

module.exports = {
    getPayloadBreakdown,
}
