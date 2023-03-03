import React from 'react';


/**
 * DIRECT MESSAGING PAGE 
 **/

class directMessagingPage extends React.Component {

    render() {

        return (
            <div>
                <h1>Direct Messaging Page</h1>
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
                            {message.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleMessageSubmit}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    };
}


export default MenuBar