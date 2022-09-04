const categoriesUrl = 'https://openapi.programming-hero.com/api/news/categories';

const loadCategories = () => {
    fetch(categoriesUrl)
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => console.log(error));
}

const displayCategories = categories =>{
    // console.log(categories);
    const ul = document.getElementById('news-categories')
    categories.forEach(category =>{
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add('nav-item', 'mx-3');
        li.innerHTML = `
        <a class="nav-link" aria-current="page" href="#" onclick="loadNews('${category.category_id}')">${category.category_name}</a>
        `;
        ul.appendChild(li);
    })
    
}
    
const loadNews = id =>{
    const newsUrl = `https://openapi.programming-hero.com/api/news/category/${id}`;
    toggleSpinner(true);
    fetch(newsUrl)
    .then(res => res.json())
    .then(data => displayNews(data.data));
}

const displayNews = category =>{
    // console.log(category);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    category.forEach(categoryElement =>{
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
              <div class="card h-100">
                <img src="${categoryElement.thumbnail_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title my-3 text-primary">${categoryElement.title}</h5>
                  <p class="card-text">${categoryElement.details.slice(0, 100)}...</p>
                  <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center w-50">
                  <img src="${categoryElement.author.img}" alt="..." class="rounded-circle w-25">
                  <h6 class="ms-2">${categoryElement.author.name}</h6>
                  </div>
                  <div>
                  <h6><i class="bi bi-eye d-inline"></i> ${categoryElement.total_view}</h6>
                  </div>
                  </div>
                <button onclick="displayNews(${categoryElement.title ? categoryElement.title : 'Sorry Data Not Found'})" href="#" class="btn btn-primary mx-auto mt-3 d-block" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show More</button>

                </div>
              </div>
            </div>
    `;
    newsContainer.appendChild(newsDiv);

    toggleSpinner(false);

    // Modal Section //
    const modalTittle = document.getElementById('newsDetailModalLabel');
    modalTittle.innerText = categoryElement.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${categoryElement.image_url}" class="img-fluid rounded-start " alt="...">
    <h6 class="mt-2"> Rating: ${categoryElement.rating.number}, ${categoryElement.rating.badge}. </h6>
    <p> <span class="fw-semibold">Details:</span> ${categoryElement.details}</p>
    <h6> Publish Date: ${categoryElement.author.published_date}.</h6>
    `;
    
    });
    

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}


loadCategories();
