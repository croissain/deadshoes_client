module.exports = {
    HOST: "ec2-54-161-164-220.compute-1.amazonaws.com",
    USER: "ltycnfjfjecaoe",
    PASSWORD: "d77f1188636ce9def8de42338015a6debc0b62fc6cb8a7a9f111ea3be095ab14",
    DB: "dfbs6670bg8rs3",
    // HOST: "localhost",
    // USER: "postgres",
    // PASSWORD: "19120667",
    // DB: "deadshoes",
    SESSION_SECRET: "secret",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};