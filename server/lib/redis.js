import {Client, Entity, Schema} from "redis-om";

const client = new Client();

const connect = async () => {
    if (client.isOpen()) return

    await client.open(process.env.REDIS_URL);
}

class Room extends Entity {}
let schema = new Schema(
    Room,
    {
        title:  {type: "string"}
    },
    {
        dataStructure: "JSON"
    }
)

export const createRoom = async (data) => {
    await connect();
    const repository = client.fetchRepository(schema);
    const room = repository.createEntity({
        title: data.title
    });

    await repository.save(room);

    return true;
}

export const fetchRoom = async () => {
    await connect();
    const repository = client.fetchRepository(schema);
    await repository.createIndex();
    const rooms = await repository.search()
        .return.all()

    if (rooms.length === 0) return null;

    return rooms;
}

export const removeRoom = async (data) => {
    await connect();
    const repository = client.fetchRepository(schema);
    await repository.createIndex();
    const toBeDeletedRoom = await repository.search().where("title").equals(data.title).returnFirst();
    await repository.remove(toBeDeletedRoom?.entityId);

    return true;
}