import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  await connection.query(
    `insert into users (id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}','admin', 'admin@admin.com','111111', true, 'now()', 'xxxx' )`
  );
  await connection.close();
}
create().then(() => console.log("criado"));
