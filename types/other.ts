export { }

declare global {
    interface BlogFilter {
        key: string;
        name: string;
        value: string;
        icon?: React.ReactNode;
    }
}