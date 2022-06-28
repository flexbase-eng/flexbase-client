// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name === 'constructor') {
                return;
            }
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
