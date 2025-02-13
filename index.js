const { ref, computed, onMounted, watch } = Vue;

const app = Vue.createApp({
    setup() {
        // 控制当前是否展示分支面板 
        const showBranchPanel = ref(false);
        // 左侧栏提交记录的激活状态
        const activeIndex = ref(0)
        // 输入的新建分支
        const inputNewBranch = ref("");

        const gitState = ref({
            // 当前分支 
            currentBranch: "master",
            // 分支列表 
            branchList: [],
            // 所有分支的commit对象 
            branchCommitsObject: {},
            // 当前选中的 commitId 
            currentCommitId: null,
        });

        window._gitState = gitState;

        // 自定义 hook，当调用 undo 时，切换 gitState 为上一个状态；调用 redo 时，恢复 gitState 为下一个状态
        const { undo, redo } = useRefHistory(gitState);

        // 当前分支的 commit 列表 
        const currentBranchCommits = computed(() => {
            const { branchCommitsObject, currentBranch } = gitState.value;
            return branchCommitsObject[currentBranch] || [];
        });

        // 当前选中的 commit 内容 
        const currentCommit = computed(() => {
            const { currentCommitId } = gitState.value;
            return (
                currentBranchCommits.value.find(
                    (it) => it.commitId === currentCommitId
                ) || null
            );
        });

        // 切换分支面板的展示状态 
        function toggleShowBranchPanel() {
            showBranchPanel.value = !showBranchPanel.value;
        }

        // 挂载时获取数据 
        onMounted(async () => {
            try {
                const gitData = await fetch("data/data.json").then((res) =>
                    res.json()
                );

                gitState.value = {
                    currentBranch: gitData.currentBranch,
                    branchList: gitData.branches,
                    branchCommitsObject: gitData.branchCommitsObject,
                    currentCommitId: gitData.branchCommitsObject.master[0].commitId,
                };
            } catch (e) {
                console.log(e);
            }
        });

        // 点击侧边栏提交记录 
        function onClickCommit(item,index) {
            activeIndex.value = index;
            gitState.value.currentCommitId = item.commitId;
        }
        // 点击分支 
        function onBranchClick(branchName) {
            // 切换分支
            gitState.value.currentBranch = branchName;
            const firstCommit = (gitState.value.branchCommitsObject[
                branchName
            ] || [])[0];
            // 切换当前commit
            if (firstCommit) {
                gitState.value.currentCommitId = firstCommit.commitId;
            } else {
                gitState.value.currentCommitId = null;
            }
        }
       
        /** 回滚到此版本 
         * @param {String} commitId 某分支的 commit 回滚到 commitId 版本
         */
        function onRollBackClick(commitId) {
            // TODO：待补充代码  目标 1
            let index = gitState.value.branchCommitsObject[gitState.value.currentBranch].findIndex(e=>e.commitId==commitId)
            let list = gitState.value.branchCommitsObject[gitState.value.currentBranch]
            gitState.value.branchCommitsObject[gitState.value.currentBranch] = list.filter((e,idx)=>idx>=index)
        }

        // 新建分支 
        function onNewBranchClick() {
            // TODO：待补充代码  目标 2
            const newBranchName = inputNewBranch.value
            if (newBranchName==gitState.value.currentBranch||newBranchName==''||newBranchName.includes(' ')) return;
            gitState.value.branchList.push(newBranchName)
            gitState.value.branchCommitsObject[newBranchName] = gitState.value.branchCommitsObject['master']
            gitState.value.currentBranch = newBranchName
        }


        /** 删除分支
         * @param {String} branchName 要删除的分支，不能为 master 
         */
        function onBranchDelete(branchName) {
            // TODO：待补充代码  目标 3
            if (branchName=='master') return;
            if (branchName==gitState.value.currentBranch) gitState.value.currentBranch = 'master';
            gitState.value.branchList = gitState.value.branchList.filter(e=>e!=branchName)
            delete gitState.value.branchCommitsObject[branchName]
        }


        return {
            showBranchPanel,
            inputNewBranch,
            gitState,
            deepClone,
            useRefHistory,
            undo,
            redo,
            currentBranchCommits,
            currentCommit,
            toggleShowBranchPanel,
            onClickCommit,
            onNewBranchClick,
            onBranchClick,
            onBranchDelete,
            onRollBackClick,
            activeIndex
        }

    },
});

app.mount("#app");