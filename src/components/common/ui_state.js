class UiState {
    uiStateStorage = {};
    saveState(name, data) {
        this.uiStateStorage[name] = data;
    }

    getStateData(name) {
        let data = this.uiStateStorage[name];
        return data && typeof data == "string" ? JSON.parse(data) : data;
    }
}
let singleton = new UiState();
export default singleton;