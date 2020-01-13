import React from 'react';

/**
 * 1：浏览器execCommand自带的命令
 * 2：需要通过 insertHTML 命令来实现的
 * 3：创建链接 createLink
 * 4：insertImage
 */
const OptTypeObj = {
    auto: 1,
    insertHTML: 2,
    createLink: 3,
    image: 4,
}
const OptTypeValues = 1 | 2 | 3 | 4;
interface OptType {
    key: string;
    title: string;
    type?: typeof OptTypeValues ; // 用于判断类型 
    isActive?: boolean;
    execCommandKey?: string; // 用于修改样式的命令
}
const optsArr: OptType[] = [{
    key: 'bold',
    title: '加粗',
    execCommandKey: 'bold',
    type: OptTypeObj.auto,
}, {
    key: 'italic',
    title: '斜体',
    execCommandKey: 'italic',
    type: OptTypeObj.auto,
}, {
    key: 'underline',
    title: '下划线',
    execCommandKey: 'underline',
    type: OptTypeObj.auto,
}, {
    key: 'code',
    title: 'code',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}, {
    key: 'upload',
    title: '上传图片',
    execCommandKey: 'insertImage',
    type: OptTypeObj.image,
}, {
    key: 'link',
    title: '添加链接',
    execCommandKey: 'createLink',
    type: OptTypeObj.createLink,
}, {
    key: 'sup',
    title: '上标',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}, {
    key: 'sub',
    title: '下标',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}, {
    key: 'undo',
    title: '撤销',
    execCommandKey: 'bold',
    type: OptTypeObj.auto,
}, {
    key: 'redo',
    title: '重做',
    execCommandKey: 'bold',
    type: OptTypeObj.auto,
}, {
    key: 'align-left',
    title: '左对齐',
    execCommandKey: 'justifyLeft',
    type: OptTypeObj.auto,
}, {
    key: 'align-center',
    title: '居中',
    execCommandKey: 'justifyCenter',
    type: OptTypeObj.auto,
}, {
    key: 'align-right',
    title: '右对齐',
    execCommandKey: 'justifyRight',
    type: OptTypeObj.auto,
}, {
    key: 'list-ul',
    title: '项目符号',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}, {
    key: 'list-ol',
    title: '编号',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}, {
    key: 'blockquote',
    title: '引用',
    execCommandKey: 'insertHTML',
    type: OptTypeObj.insertHTML,
}];

function conversetOptToMap(arr: OptType[]): any {
    const res = new Map();
    for (let i = 0, len = arr.length; i < len; i++) {
        const { key, title } = arr[i];
        res.set(key, {
            ...arr[i],
            isActive: false,
        });
    }
    return res;
}

export default class MiniText extends React.Component<any, any> {
    state = {
        optsMap: conversetOptToMap(optsArr),
        isMiniTextFocus: false,
    }

    /**
     * 渲染操作栏
     */
    getOptsList = () => {
        const { optsMap } = this.state;
        const keys = [...optsMap.keys()];
        if (keys.length === 0) {
            return;
        }

        return keys.map((k: string) => {
            const item = optsMap.get(k);
            const { key, title, isActive } = item;
            return (
                <span
                    className={`mini-text-opts-item ${isActive && 'mini-text-opts-item-active'}`}
                    title={title} key={key}
                    onClick={() => this.handleOptChange(item)}
                >
                    <span className={`iconfont icon-${key}`}></span>
                </span>
            )
        })
    }

    /**
     * 处理操作栏
     */
    handleOptChange = (item: OptType) => {
        const { key, type } = item;

        switch (type) {
            case OptTypeObj.auto:
                this.handleAutoCommand(item);
                break;
        }
        
    }

    /**
     * 处理浏览器自动执行的样式修改
     */
    handleAutoCommand = (item: OptType) => {
        const { key } = item;
        const { optsMap } = this.state;
        this.execCommandStyles(key);
        optsMap.set(key, {
            ...item,
            isActive: !item.isActive,
        })
        this.setState({
            optsMap,
        })
    }

    /**
     * 修改样式
     */
    execCommandStyles = (command: string, val?: any) => {
        document.execCommand('StyleWithCSS',true); // 用行内样式修改样式 否则就用 标签方式
        document.execCommand(command,false,val);
    }

    handleMiniTextFocus = () => {
        this.setState({
            isMiniTextFocus: true,
        });

        console.log(document.queryCommandEnabled("bold"), 'document.queryCommandEnabled("bold");')
    }

    render() {
        const { isMiniTextFocus } = this.state;
        return (
            <div className="mini-text-root">
                <div className="mini-text-wrap">
                    <div className="mini-text-opts">
                        {this.getOptsList()}
                    </div>
                    <div 
                        className={`mini-text-content ${isMiniTextFocus && 'mini-text-content-focus'}`} 
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                        onFocus={this.handleMiniTextFocus}
                    >
                        <p> </p>
                    </div>
                </div>
            </div>
        )
    }
}