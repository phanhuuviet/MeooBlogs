BalloonEditor
    .create( document.querySelector( ".editor" ), {
        placeholder: 'Nội dung bài viết',
    } )
    .then( editor => {
        console.log( editor );
    })
    .catch( error => {
        console.error( error );
    });