let filter = 'weekly';
const timeRecord = document.querySelector('.timeRecord');
const filterBtns = document.querySelectorAll('.filter a')

filterBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    filterBtns.forEach(btn => {
      btn.classList.remove('active')
    })
    e.target.classList.add('active')
  })
})

function changeFilter(option) {
  filter = option;
  getData()
}

function getData(){
  fetch('../data.json')
    .then((response) => response.json())
    .then((json) => loopData(json));
};

function loopData(json){
  timeRecord.innerHTML = "";
  let dataArr = [];
  dataArr = json;
  dataArr.map(hour => {
    displayData(hour)
  })
}

function displayData(dataArr){
  const activity = document.createElement('div');
  activity.classList.add('activity', `${dataArr.title}`);
  activity.innerHTML = `
    <div class="details">
      <a href="#">
        <p class="titleBlk">
          <span class="title">${dataArr.title}</span>
          <span class="menu"><img src="/images/icon-ellipsis.svg" alt=""></span>
        </p>
        <div class="timeBlk">
        ${filter == 'daily' ? `<p class="hours">${dataArr.timeframes.daily.current}hrs</p> <p class="summary">Last Week - ${dataArr.timeframes.daily.previous}hrs</p>` : ''}
        ${filter == 'weekly' ? `<p class="hours">${dataArr.timeframes.weekly.current}hrs</p> <p class="summary">Last Week - ${dataArr.timeframes.weekly.previous}hrs</p>` : ''}
        ${filter == 'monthly' ? `<p class="hours">${dataArr.timeframes.monthly.current}hrs</p> <p class="summary">Last Week - ${dataArr.timeframes.monthly.previous}hrs</p>` : ''}
        </div>
        </a>
    </div>
  `
  timeRecord.append(activity)
}

(function init(){
  getData()
})();