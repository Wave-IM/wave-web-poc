export const Config = {
    MQTT: {
        connectionURL: "ws://10.10.10.101:8080/mqtt",
        username: "e1cde8cc-0b28-45c2-ba7e-4b2575d3dba6",
        password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjOTA1YzcxMS0zMjEzLTRmZjMtYjA4MS1hOTA4MmRlZWFkNTAiLCJleHAiOjE1NDk1NDA3NDAsImlzcyI6IldhdmVEZW1vIn0.l1x4lJTOiw30zU5kVrmNZ5TKgIt9fQ2p8ONYy80cn_0",
        clientID: "e1cde8cc-0b28-45c2-ba7e-4b2575d3dba6", 
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        protocol: 'ws',
        hostname: "10.10.10.101",
        port: 9001,
        path: "/mqtt"
    },
    DemoAPI: {
        baseURL: "http://localhost:8086",
        Endpoints: {
            Login: "/v1/users/login"
        }
    }
};