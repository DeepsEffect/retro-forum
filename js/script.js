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
  posts.forEach((post) => {
    // console.log(post);
    const newPost = document.createElement("div");
    newPost.classList = `border border-[#797DFC] lg:w-[772px] min-h-[270px] bg-[#7D7DFC1A] rounded-3xl p-5 lg:p-10`;
    newPost.innerHTML = `
        <div class="flex gap-x-6">
        <!-- avatar -->
        <div>
            <div class="avatar online">
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
                <p class="color-gray font-inter font-normal text-lg">${
                  post.description
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
                    <div class="cursor-pointer">
                        <img src="icons/inbox.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    cardContainer.appendChild(newPost);
  });
};

const latestPostsData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const newsData = await response.json();
  const newsContainer = document.getElementById("news-container");
  newsData.forEach((news) => {
    console.log(news);
    const latestNews = document.createElement("div");
    latestNews.classList = `card lg:w-96 bg-base-100 shadow-xl`;
    latestNews.innerHTML = `
    <figure><img src="${news.cover_image}"
    alt="Shoes" /></figure>
<div class="card-body">
<div class="flex gap-x-2">
    <img src="icons/date.svg" alt="">
    <p> ${news.author.posted_date ? news.author.posted_date : 'No Published Date'} </p>
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
        <p class="color-gray text-sm font-normal">${news.author.designation ? news.author.designation : 'Unknown'}</p>
    </div>
</div>
</div>
    `;
    newsContainer.appendChild(latestNews);
  });
};

letsDiscussData();
latestPostsData();
