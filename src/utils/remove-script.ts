export function removeScript(string: string) {
    const regex = /<script>[\s\S]*?<\/script>/;
    string.replace(regex, '');
    return string;
}