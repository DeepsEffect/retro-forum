const letsDiscussData = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const posts = data.posts;
    displayPosts(posts);
};

// display data
const displayPosts = (posts) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    posts.forEach((post) => {
        // console.log(post);
        const newPost = document.createElement("div");
        newPost.classList = `border border-[#797DFC] lg:w-[772px] min-h-[270px] bg-[#7D7DFC1A] rounded-3xl p-5 lg:p-10 transition-transform duration-300 lg:hover:scale-105 hover:bg-[#7D7DFC33]`;
        newPost.innerHTML = `
        <div class="flex gap-x-6">
        <!-- avatar -->
        <div>
            <div id="avatar-status-${post.id}" class="avatar">
                <div class="w-14 rounded">
                    <img
                        src="${post.image}" />
                </div>
            </div>
        </div>
        <div class="space-y-2">
            <!-- tags -->
            <div class="flex gap-x-4">
                <p>${"#" + post.category}</p>
                <p>Author: <strong>${post.author.name}</strong></p>
            </div>
            <!-- content -->
            <div class="lg:w-[569px] space-y-3">
                <h2 class="color-black text-xl font-bold">${post.title}
                </h2>
                <p class="color-gray font-inter font-normal text-lg">${post.description
            }</p>
                <div class="border-[#12132d6d] border-t border-dashed"></div>
                <!-- icons -->
                <div class="flex flex-wrap justify-between lg:pt-6">
                    <div class="flex flex-wrap gap-x-10">
                        <div class="flex gap-x-2">
                            <img src="icons/comments.svg" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-x-2">
                            <img src="icons/watched.svg" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-x-2">
                            <img src="icons/duration.svg" alt="">
                            <p>5 min</p>
                        </div>
                    </div>
                    <div onclick="addToBookmark(\`${post.title}\`, '${post.view_count
            }')" class="cursor-pointer transition transform lg:hover:scale-105">
                        <img src="icons/inbox.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(newPost);
        // adding avatar active status
        const avatar = document.getElementById(`avatar-status-${post.id}`);
        if (post.isActive) {
            avatar.classList.add("online");
        } else {
            avatar.classList.add("offline");
        }
    });
    loadingSpinnerToggle(false);
};
// latest post data section
const latestPostsData = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const newsData = await response.json();
    const newsContainer = document.getElementById("news-container");
    newsData.forEach((news) => {
        // console.log(news);
        const latestNews = document.createElement("div");
        latestNews.classList = `card bg-base-100 shadow-xl transition-transform duration-300 lg:hover:scale-105 hover:shadow-2xl`;
        latestNews.innerHTML = `
    <figure><img src="${news.cover_image}"
    alt="Shoes" /></figure>
<div class="card-body">
<div class="flex gap-x-2">
    <img src="icons/date.svg" alt="">
    <p> ${news.author.posted_date ? news.author.posted_date : "No Published Date"
            } </p>
</div>
<h2 class="card-title font-bold text-lg">${news.title} </h2>
<p class=" color-gray text-base font-normal"> ${news.description}</p>
<!-- avatar -->
<div class="flex gap-x-4 mt-4">
    <div class="avatar">
        <div class="w-12 rounded-full">
            <img src="${news.profile_image}" />
        </div>
    </div>
    <div>
        <h2 class="color-black text-base font-bold">${news.author.name}</h2>
        <p class="color-gray text-sm font-normal">${news.author.designation ? news.author.designation : "Unknown"
            }</p>
    </div>
</div>
</div>
    `;
        newsContainer.appendChild(latestNews);
    });
};

//add to book mark
let bookmarkCount = 0;
const addToBookmark = (title, view) => {
    // console.log(title, view);
    const bookmarkContainer = document.getElementById("bookmark-cards");
    const bookmarkCounter = document.getElementById('mark-as-read-count');
    const newBookmark = document.createElement("div");
    newBookmark.classList = `p-4 lg:p-6 text-base font-bold bg-[#fff] flex justify-between items-center shadow-lg rounded-xl`;
    newBookmark.innerHTML = `
    <h2 class="w-[212px]">${title}</h2>
    <div class="flex gap-x-2">
        <img src="icons/eye.svg" alt="">
        <p>${view}</p>
    </div>
    `;
    bookmarkContainer.appendChild(newBookmark);
    bookmarkCount++;
    bookmarkCounter.innerText = bookmarkCount;
};

// search functionality
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input").value;
    searchByCategory(searchInput);
});

const searchByCategory = async (categoryName) => {
    loadingSpinnerToggle(true);
    const res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
    );
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts)
    displayPosts(posts);
    // take me to to the moon__ **lets discuss section :3
    const letsDiscuss = document.getElementById('lets-discuss-section');
    setTimeout(() => {
        letsDiscuss.scrollIntoView({ behavior: 'smooth' });
    }, 2000)

};

// toggle loading spinner
const loadingSpinnerToggle = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
    } else {
        setTimeout(() => {
            loadingSpinner.classList.add("hidden");
        }, 2000);
    }
};

letsDiscussData();
latestPostsData();
