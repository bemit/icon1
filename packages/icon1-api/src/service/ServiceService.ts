export type ServiceServiceLoader = Promise<{ [key: string]: any }>

// todo: correctly type services with their constructor params for `init`
export type ServiceServiceDefinition = () => { loader: ServiceServiceLoader, init: any[] }

class ServiceServiceClass {
    // todo: correctly type services as dynamic imports using the service `name` as module name
    protected services: { [key: string]: ServiceServiceDefinition } = {}
    protected loadedServices: { [key: string]: InstanceType<any> } = {}

    add(name: string, service: ServiceServiceDefinition) {
        this.services[name] = service
    }

    async get(name: string) {
        if(!this.services[name]) {
            throw new Error('service-not-found: ' + name)
        }
        if(!this.loadedServices[name]) {
            const serviceDef = this.services[name]()
            const service = await serviceDef.loader.then(module => module[name])
            this.loadedServices[name] = new service(...serviceDef.init || [])
        }
        return this.loadedServices[name]
    }
}

// export instance to have a singleton
export const ServiceService = new ServiceServiceClass()
