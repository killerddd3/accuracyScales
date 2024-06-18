import {defineStore} from "pinia";
import {ipc} from "@/utils/ipcRenderer";
import {ipcApiRoute} from "@/api/main";

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            code: '',
            name: '',
            pkId: '',
            orgId: ''
        }),
        actions: {
            // 获取用户信息
            getInfo() {
                return new Promise((resolve, reject) => {
                    ipc.request(ipcApiRoute.getUserInfo, {}).then(data => {
                        const {cod, nam, pkId, orgId} = data
                        this.code = cod
                        this.name = nam
                        this.pkId = pkId
                        this.orgId = orgId
                    })
                })
            }
        }
    })

export default useUserStore
