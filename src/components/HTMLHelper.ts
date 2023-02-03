class htmlhelper {
    public id(id: string) {
        return document.getElementById(id);
    }
    public new(elem: string, id: string, classes?: string) {
        let te = document.createElement(elem);
        te.id = id;
        if(classes) te.className = classes;
        return te;
    }
}

export const HTMLHelper = new htmlhelper();