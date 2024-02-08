import code from './shaders.wgsl.js'
let adapter
let device

try {
    adapter = await navigator.gpu?.requestAdapter()
    device = await adapter?.requestDevice()
    if (!device) console.error('Webgpu is not supported')
} catch (e) {
    console.error(e)
}
const context = document.querySelector('canvas')?.getContext('webgpu')
const format = navigator.gpu.getPreferredCanvasFormat()
context.configure({
    device,
    format,
})
const module = device.createShaderModule({
    label: 'Triangle veretex and fragment shaders',
    code
})
const pipeline = device.createRenderPipeline({
    label: 'Triangle pipeline',
    layout: 'auto',
    vertex: {
        module,
        entryPoint: 'vs',
    },
    fragment: {
        module,
        entryPoint: 'fs',
        targets: [{ format }],
    },
})
const renderPassDesc = {
    label: 'RenderPass Descriptior',
    colorAttachments: [{
        clearValue: [0.1, 0.8, 1, 1],
        loadOp: 'clear',
        storeOp: 'store',
    }]
}
const renderer = () => {
    renderPassDesc.colorAttachments[0].view = context.getCurrentTexture().createView()

    const encoder = device.createCommandEncoder({ label: 'The encoder' })
    const pass = encoder.beginRenderPass(renderPassDesc)

    pass.setPipeline(pipeline)
    pass.draw(3)        
    pass.end()

    device.queue.submit([encoder.finish()])
}

renderer()