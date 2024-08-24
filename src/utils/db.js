const Database = require('better-sqlite3');
const db = new Database(__basedir + '/data/db.sqlite');

db.prepare(`CREATE TABLE IF NOT EXISTS settings (guild_id TEXT PRIMARY KEY, guid_name TEXT, modmail_category_id TEXT, modmail_support_role_id TEXT);`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS tickets (author_id TEXT, author_name TEXT, ticket_id TEXT);`).run();

const settings = {
  insertRow: db.prepare(`INSERT OR IGNORE INTO settings (guild_id, guild_name) VALUES (?, ?);`),

  selectRow: db.prepare('SELECT * FROM settings WHERE guild_id = ?;'),
  selectModMailCategoryId: db.prepare('SELECT modmail_category_id FROM settings WHERE guild_id = ?;'),
  selectModMailSupportRoleId: db.prepare('SELECT modmail_support_role_id FROM settings WHERE guild_id = ?;'),

  updateGuildName: db.prepare('UPDATE settings SET guild_name = ? WHERE guild_id = ?;'),
  updateModMailCategory: db.prepare('UPDATE settings SET modmail_category_id = ? WHERE guild_id = ?;'),
  updateModMailSupportRoleId: db.prepare('UPDATE settings SET modmail_support_role_id = ? WHERE guild_id = ?;'),
  deleteGuild: db.prepare('DELETE FROM settings WHERE guild_id = ?;')
};

const tickets = {
  newTicket: db.prepare(`INSERT OR IGNORE INTO tickets (author_id, author_name, ticket_id) VALUES (?, ?, ?);`),
  selectTicket: db.prepare('SELECT * FROM tickets WHERE author_id = ?;'),
  selectTicketId: db.prepare('SELECT ticket_id FROM tickets WHERE author_id = ?;'),
  selectAuthorId: db.prepare('SELECT author_id FROM tickets WHERE ticket_id = ?;'),
  selectAuthorName: db.prepare('SELECT author_name FROM tickets WHERE ticket_id = ?;'),
  deleteTicket: db.prepare('DELETE FROM tickets WHERE ticket_id = ?;')
}

module.exports = {
  settings,
  tickets
};