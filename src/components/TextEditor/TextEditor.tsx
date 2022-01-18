import React, { useEffect, useCallback, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import { io, Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import './TextEditor.css'

interface TextEditorProps {
    title: string
}

type ISocket = Socket | null
type IQuill = Quill | null

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const SAVE_INTERVAL = 2000

const TextEditor: React.FC<TextEditorProps> = ({ title }) => {
    // @ts-ignore
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState<ISocket>()
    const [quill, setQuill] = useState<IQuill>()

    useEffect(() => {
        const s = io("http://localhost:4000")
        setSocket(s)

        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once('load-document', document => {
            quill.setContents(document.data)
            quill.enable()
        })

        socket.emit('get-document', documentId)
    }, [socket, quill, documentId])


    useEffect(() => {
        if (socket == null) return
        socket.emit('set-document-title', title)
    }, [title, socket])


    useEffect(() => {
        if (socket == null || quill == null) return

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, SAVE_INTERVAL)

        return () => {
            clearInterval(interval)
        }
    }, [socket, quill])


    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta: any) => {
            quill.updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket, quill])


    useEffect(() => {
        if (socket == null || quill == null) return

        const handler = (delta: any, oldDelta: any, source: string) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])


    const wrapperRef = useCallback(wrapper => {
        if (wrapper === null) return

        wrapper.innerHTML = ""
        const editor = document.createElement('div')
        wrapper.append(editor)
        const q = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: TOOLBAR_OPTIONS }
        })

        q.disable()
        q.setText('Type @ to insert')
        setQuill(q)
    }, [])


    return (
        <div className="text-editor">
            <div ref={wrapperRef} id="container"></div>
        </div>
    )
}

export default TextEditor