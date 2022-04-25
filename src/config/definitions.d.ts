declare global {
    namespace NodeJS {
        interface Global {
            Config: {},
            Environment: {},
            Chalk: {}
        }
    }
}

export default global;