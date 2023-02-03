class htmlhelper {
    public id(id: string) {
        return document.getElementById(id);
    }
    public new(elem: string, id: string, classes?: string) {
        let te: any = document.createElement(elem);
        te.id = id;
        if(elem == "canvas") te.width = window.innerWidth/ 2; te.height = window.innerHeight/2;
        if(classes) te.className = classes;
        return te;
    }
}

export const HTMLHelper = new htmlhelper();