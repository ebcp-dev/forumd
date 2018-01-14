import axios from 'axios';

const Utility = {};

Utility.parseDate = (parseDate) => {
    //since we are getting a UTC date
    const msecPerMinute = 1000 * 60;  
    const msecPerHour = msecPerMinute * 60;  
    const msecPerDay = msecPerHour * 24;  

    const date = new Date(parseDate);
    const current = new Date();

    let interval = current.getTime() - date.getTime();
    let days = Math.floor(interval / msecPerDay );
    //interval = interval - (days * msecPerDay );
    let hours = Math.floor(interval / msecPerHour );
    //interval = interval - (hours * msecPerHour );
    let minutes = Math.floor(interval / msecPerMinute );
    //interval = interval - (minutes * msecPerMinute );
    let seconds = Math.floor(interval / 1000 );
    let elapsed;
    if (interval > 1000) {
        elapsed = `${seconds} second(s) ago.`;
    }
    if (seconds > 60) {
        elapsed = `${minutes} minute(s) ago.`;
    }
    if (minutes > 60) {
        elapsed = `${hours} hour(s) ago.`;
    }
    if (hours > 24) {
        elapsed = `${days} day(s) ago.`;
    }
    const parsedDate = {
        month: date.getMonth()+1,
        date: date.getDate(),
        year: date.getFullYear(),
        elapsed
    };
    return parsedDate;
}


// Get url of parent post of comment
Utility.getParentPost = (commentId) => {
    axios.get(`/api/comment/${commentId}`)
    .then(results => {
        //console.log(results.data.parentPost);
        // Parse title into url
        let parentPost = results.data.parentPost;
        let parentUrl = parentPost.title.split(' ').join('%20');
        let url = `/posts/${parentUrl}/${parentPost.shortId}`;
        return url;
    });
}

// Toolbar modules for react quill
Utility.toolbar = {
    toolbar: [
        // [{ font: [] }, { size: [] }],
		// [{ align: [] }, 'direction' ],
		[ 'italic', 'underline', 'strike' ],
		[{ color: [] }, { background: [] }],
		[{ script: 'super' }, { script: 'sub' }],
		['blockquote', 'code-block' ],
		[{ list: 'ordered' }, { list: 'bullet'}],
		[ 'link' ],
		[ 'clean' ]
    ]
}

export default Utility;