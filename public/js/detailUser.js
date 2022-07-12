const imageInput = document.querySelector(".custom-file-input");


imageInput.addEventListener("change", function(e){
    const labelImageInput = document.querySelector('.custom-file-label')
    const reader = new FileReader();
    reader.onload = function(){
        const imageResult = document.querySelector(".img-fluid");
        imageResult.src = reader.result
    }
    labelImageInput.innerHTML = e.target.files[0].name
    reader.readAsDataURL(e.target.files[0]);
})
