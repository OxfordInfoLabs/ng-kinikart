export class BaseService {

    constructor(public config?) {
    }

    public constructHttpURL(url) {
        if (this.config) {
            return this.config.httpURL + url;
        }
        return url;
    }
}
