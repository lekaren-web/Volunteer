from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "image" : "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
    }
    return response_body

@api.route('/events')
def events():
    response_body ={ 'events': [{
        "title": "This is the event",
        "description" :"Hello! I'm a full stack developer that loves python and javascript",
        "image" : "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE"
    },
    {
        "title": "This is the event",
        "description" :"Hello! I'm a full stack developer that loves python and javascript",
        "image" : "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE"
    },
    {
        "title": "This is the event",
        "description" :"Hello! I'm a full stack developer that loves python and javascript",
        "image" : "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE"
    },
    {
        "title": "This is the event",
        "description" :"Hello! I'm a full stack developer that loves python and javascript",
        "image" : "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE"
    }
    ]}
    return response_body