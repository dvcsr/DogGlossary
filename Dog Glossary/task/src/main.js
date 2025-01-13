const buttonRandomDog = document.getElementById("button-random-dog");
const buttonShowBreed = document.getElementById("button-show-breed");
const buttonShowSubBreed = document.getElementById("button-show-sub-breed");
const buttonShowAllBreed = document.getElementById("button-show-all");

async function randomDog() {
    const url = "https://dog.ceo/api/breeds/image/random";
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            let image = document.createElement("img");
            image.src = json.message;
            image.id = "random-dog-image";
            document.getElementById('content').replaceChildren(image);
        })
        .catch(error => console.log(error));
}

async function getRandomImageByBreed(breed){

    let url = "https://dog.ceo/api/breed/" + breed.toLowerCase() + "/images/random"
    await fetch(url)
        .then(response => response.json())
        .then(json => {
             if (json.status === "error") {
                 let errorMessage = document.createElement("p");
                 errorMessage.textContent = "Breed not found!";
                 document.getElementById("content").replaceChildren(errorMessage);
             } else {
                 let image = document.createElement("img");
                 image.src = json.message;
                 image.id = "random-dog-image";
                 document.getElementById('content').replaceChildren(image);
             }

        }).catch(error => console.log(error))
}

async function getSubBreed(breed) {
    let url = `https://dog.ceo/api/breed/${breed.toLowerCase()}/list`
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.status === "error"){
                let errorMessage = document.createElement('p');
                errorMessage.textContent ="Breed not found!";
                document.getElementById("content").replaceChildren(errorMessage);
            } else {
                let listcontent = json.message;
                if (listcontent.length === 0) {
                    let error = document.createElement("p");
                    error.textContent ="No sub-breeds found!";
                    document.getElementById("content").replaceChildren(error);
                } else {
                    let olElement = document.createElement("ol");
                    listcontent.forEach(element => {
                        let li = document.createElement("li");
                        li.innerText = element; //for whitespaces and linebreak
                        olElement.appendChild(li);
                    });
                    document.getElementById("content").replaceChildren(olElement);
                }
            }
        })
    .catch(error => {
        console.log(error);
        let errorMessage = document.createElement('p');
        errorMessage.textContent ="Breed not found!";
        document.getElementById("content").replaceChildren(errorMessage);
    });
}

async function getAllBreeds() {
    await fetch(`https://dog.ceo/api/breeds/list/all`)
    .then(response => response.json())
    .then(json => {
        //create master list
        let breedListElement = document.createElement("ol");
        //call entries for breed and sub-breed
        Object.entries(json.message).forEach(([breed, subBreed]) => {
            //breed item to be append to master list
            let breedItem = document.createElement("li");
            breedItem.innerText = breed;
            //handle nested sub-breed list for every breed item
            if (subBreed.length > 0) {
                //create container for nested list
                let subBreedListElement = document.createElement("ul");
                //call every item of sub-breed in array to be append in nestedlist
                for (let i in subBreed) {
                    let subBreedItem = document.createElement("li");
                    subBreedItem.innerText = subBreed[i];
                    subBreedListElement.appendChild(subBreedItem);
                }
                breedItem.appendChild(subBreedListElement);
            }
            breedListElement.appendChild(breedItem);
            document.getElementById("content").replaceChildren(breedListElement);
        });
    })
    .catch(error => {console.log(error)
    });
}

buttonRandomDog.addEventListener('click', randomDog);
buttonShowBreed.addEventListener('click', () => {
    let breed = document.getElementById("input-breed").value;
    getRandomImageByBreed(breed);
});
buttonShowSubBreed.addEventListener('click', () => {
    let breed = document.getElementById("input-breed").value;
    getSubBreed(breed);
})
buttonShowAllBreed.addEventListener('click', getAllBreeds)