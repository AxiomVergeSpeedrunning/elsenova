import { Command, Alias } from 'db';
import connection from 'db/connection';
import lineReader from 'line-reader';

(async () => {
  await connection.sync();
  const fileName = process.argv[process.argv.length - 1];

  lineReader.eachLine(fileName, async line => {
    const data = JSON.parse(line);
    const { aliases, permissionsLevel, ...rest } = data;
    // This is from Mongo
    // eslint-disable-next-line no-underscore-dangle
    rest.name = rest._id;
    rest.permissionsLevel = permissionsLevel.$numberInt;

    const newEntry = await Command.create(rest);
    for (const alias of aliases) {
      await Alias.create({ name: alias.toLowerCase(), CommandId: newEntry.id });
    }
  });
})();
