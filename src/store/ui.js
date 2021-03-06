import { CALLAPI } from '../api/callapi.js'

const moduleUi = {
    namespaced: true,
    state: () => ({
        pagename: "/6pan",
        modaltime: 0,
        modalname: "",
        modaldata: {},
        loading: false,
        lixiantip: "",
        webdav: "",
        copytotip: "",
        renamemultitip: "",
        notice: [{ url: "", title: "" }],
        noticeSelected: { url: "", title: "" },
        serverVer: "",
        serverVerUrl: "",
        exeVer: "",

        ConfigPlayerPath: "",
        ConfigSavePath: "",
        ConfigSavePathEveryTime: false,
        ConfigRemotePassword: "",
        ConfigTaskCountMax: 3,
        ConfigThreadCountMax: 10,
        ConfigRunDownFinish: false,
        ConfigUseVipVideoUrl: false,
        ConfigRunTimes: 0,
    }),
    mutations: {
        mGotoPage(state, pagename) {
            state.pagename = pagename;
        },
        mShowModal(state, { name, data }) {
            state.modalname = name;
            state.modaldata = data;
            state.modaltime = new Date().getTime();
        },
        mLoading(state, loading) {
            state.loading = loading;
        },

        mNotice(state, { pwd, savepath, everytime, playerpath, taskcount, threadcount, runfinish, usevipvideo, runtimes, ver, verurl, exe, lixian, webdav, copyto, renamemulti, notice }) {
            state.ConfigPlayerPath = playerpath
            state.ConfigSavePath = savepath
            state.ConfigSavePathEveryTime = everytime
            state.ConfigTaskCountMax = taskcount
            state.ConfigThreadCountMax = threadcount
            state.ConfigRunDownFinish = runfinish
            state.ConfigUseVipVideoUrl = usevipvideo
            state.ConfigRunTimes = runtimes
            state.ConfigRemotePassword = pwd

            state.serverVer = ver
            state.serverVerUrl = verurl
            state.exeVer = exe
            state.lixiantip = lixian
            state.copytotip = copyto
            state.webdav = webdav
            state.renamemultitip = renamemulti
            state.notice = notice
            if (notice.length > 0) {
                state.noticeSelected = notice[0];
            } else {
                state.noticeSelected = { url: "", title: "" };
            }
            document.title = "6盘小白羊版 v" + exe;
        },
        mNoticeSelect(state) {
            if (state.notice.length > 0) {
                for (let i = 0; i < state.notice.length; i++) {
                    if (state.noticeSelected.title == state.notice[i].title) {
                        if ((i + 1) < state.notice.length) {
                            state.noticeSelected = state.notice[i + 1];
                            return;
                        }
                    }
                }
                state.noticeSelected = state.notice[0];
            }
        },
        mSettingSavePath(state, savepath) {
            state.ConfigSavePath = savepath;
        },

    },
    actions: {
        aNotice(context) {
            CALLAPI({ cmd: "Notice" }).then(resp => {
                if (resp.code == 0) {
                    context.commit('mNotice', {...resp });
                    if (resp.ver != "" && resp.ver != resp.exe) {
                        context.commit("mShowModal", { name: "verupdate", data: {} });
                    }
                }
            });
        },
        aSelectSavePath() {
            return CALLAPI({ cmd: "SettingSelectDir" });
        },
        aSelectPlayerPath() {
            return CALLAPI({ cmd: "SettingSelectPlayer" });
        },
        aSaveConfig(context, { pwd, savepath, everytime, playerpath, taskcount, threadcount, runfinish, usevipvideo }) {
            return CALLAPI({ cmd: "SettingSave", pwd, savepath, everytime, playerpath, taskcount, threadcount, runfinish, usevipvideo });
        },
        aSavePathConfig(context, { savepath }) {
            return CALLAPI({ cmd: "SettingSavePath", savepath }).then(resp => {
                if (resp.code == 0) {
                    context.commit('mSettingSavePath', savepath);
                }
                return resp;
            });
        },
    },
};

export default moduleUi