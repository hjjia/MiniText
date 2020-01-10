import React from 'react';
const optsArr = [{
    key: 'blod',
    title: '加粗'
}, {
    key: 'italic',
    title: '斜体'
}, {
    key: 'underline',
    title: '下划线'
}, {
    key: 'code',
    title: 'code'
}, {
    key: 'upload',
    title: '上传图片'
}, {
    key: 'link',
    title: '添加链接'
}, {
    key: 'sup',
    title: '上标'
}, {
    key: 'sub',
    title: '下标'
}, {
    key: 'undo',
    title: '撤销'
}, {
    key: 'redo',
    title: '重做'
}, {
    key: 'align-left',
    title: '左对齐'
}, {
    key: 'align-center',
    title: '居中'
}, {
    key: 'align-right',
    title: '右对齐'
}, {
    key: 'list-ul',
    title: '项目符号'
}, {
    key: 'list-ol',
    title: '编号'
}, {
    key: 'blockquote',
    title: '引用'
}];

function conversetOptToMap(arr: any[]): any {
    const res = new Map();
    for (let i = 0, len = arr.length; i < len; i++) {
        const { key, title } = arr[i];
        res.set(key.replace('-',''), arr[i]);
    }
    return res;
}

export default class MiniText extends React.Component<any, any> {
    state = {
        optsMap: conversetOptToMap(optsArr),
    }
    getOptsList = () => {
        const { optsMap } = this.state;
        const keys = [...optsMap.keys()];
        if (keys.length === 0) {
            return;
        }

        return keys.map((k: string) => {
            const item = optsMap.get(k);
            const { key, title } = item;
            return (
                <div className="mini-text-opts-item" title={title} key={key}>
                    <span className={`iconfont icon-${key}`}></span>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="mini-text-root">
                <div className="mini-text-wrap">
                    <div className="mini-text-opts">
                        {this.getOptsList()}
                    </div>
                    <div 
                        className="mini-text-content" 
                        contentEditable={true} 
                        suppressContentEditableWarning={true}
                    >
                        <p> </p>
                    </div>
                </div>
            </div>
        )
    }
}