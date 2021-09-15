export const loadSimplexForm = (callback) => {
    const simplexFormScript = document.getElementById('simplexForm');
    if (!simplexFormScript) {
        const script = document.createElement('script');
        // @ts-ignore
        script.src = process.env.REACT_APP_SIMPLEX_FORM_SCRIPT_SRC;
        script.id = 'simplexForm';
        document.body.appendChild(script);
        script.onload = () => {
            if (callback) callback();
        };

        if (process.env.REACT_APP_ENV === 'production') {
            const script1 = document.createElement('script');
            script1.src = 'https://checkout.simplexcc.com/splx.js';
            document.body.appendChild(script1);
        }
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