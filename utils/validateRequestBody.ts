export default function validateRequestBody(requestBody) {
    const errors: string[] = [];
    const items: string[] = Object.keys(requestBody);

    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if (!requestBody[element]) {
            const fieldName = element[0].toUpperCase() + element.slice(1);

            errors.push(`${fieldName} field is required!`);
        } else continue;
    }

    return errors;
}
