import { useEffect, useRef, useState } from "react"
import socket from "./socket";
import { nanoid } from 'nanoid';

const WS = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('')

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages((currState) => currState.concat({ content: input, user, id: nanoid(), createdAt: Date.now() }))
        socket.emit('message', { content: input, user, id: nanoid(), createdAt: Date.now() });
        setInput('')
    }

    useEffect(() => {
        setUser(prompt('enter username'))
        socket.on('new-msg', (data) => setMessages((currState) => currState.concat(data)))
    }, [])

    const format = (createdAt) => {
        return new Date(createdAt).toLocaleTimeString('en-GB', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    return (
        <div className="container vh-100 py-5">
            <div className="row h-100">
                <div className="col-md-4 border-end">
                    <ul className="list-group">
                        <li className="list-group-item active">User 1</li>
                        <li className="list-group-item">User 2</li>
                        <li className="list-group-item">User 3</li>
                        <li className="list-group-item">Group 1</li>
                        <li className="list-group-item">Group 2</li>
                    </ul>
                </div>
                <div className="col-md-8 position-relative d-flex flex-column justify-content-between">
                    <div style={{ overflowY: 'auto' }}>

                        {messages.map((message) => {
                            return (
                                <div key={message.id}>
                                    <div className={message.user == user ? 'message-blue' : 'message-orange'}>
                                        <span className="fw-bold">{message.user}</span>
                                        <p className="message-content">{message.content}</p>
                                        <div className="message-timestamp-left">{format(message.createdAt)}</div>
                                    </div>
                                </div>
                            )
                        })
                        }

                    </div>
                    <form className='validate mb-2' onSubmit={handleSubmit}>

                        <input
                            type="text"
                            className='form-control'
                            placeholder='Type a Message'
                            value={input}
                            onChange={handleInput} />
                    </form>
                </div>
            </div>
        </div >
    )
}
export default WS