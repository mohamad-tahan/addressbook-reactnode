async function up () {
  await this('users').updateMany({}, { $set: { state: 'California' } });
}

async function down () {
  await this('users').updateMany({}, { $unset: { state: 1 } });
}

module.exports = {
  down,
  up
}