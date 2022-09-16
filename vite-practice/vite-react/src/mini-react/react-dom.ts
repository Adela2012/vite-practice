import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

function render(vnode, container) {
    console.log(vnode, container, container.nodeName)

    const fiberRoot = {
        type: container.nodeName.toLowerCase(),
        stateNode: container,
        props: {
            children: vnode
        }
    }

    scheduleUpdateOnFiber(fiberRoot)
}

export default {render};
