export const loadSimplexForm = (callback) => {
    const simplexFormScript = document.getElementById('simplexForm');
    if (!simplexFormScript) {
        const script = document.createElement('script');
        script.src = 'https://iframe.sandbox.test-simplexcc.com/form-sdk.js';
        script.id = 'simplexForm';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };
    }
    if (simplexFormScript && callback) callback();
};

export const unloadSimplexForm = (callback) => {
    const simplexFormScript = document.getElementById('simplexForm');
    if (simplexFormScript) {
        simplexFormScript.parentNode?.removeChild(simplexFormScript);
        if (callback) callback();
    }
}