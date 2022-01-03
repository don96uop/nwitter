import requests
from bs4 import BeautifulSoup
from json import loads, dumps

def crawl():
    url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=206%2C04%2C06&theaterCode=0090&date=20220104"
    response = requests.get(url)
    html = response.text

    soup = BeautifulSoup(html,'html.parser')

    movies = soup.select('body > div > div.sect-showtimes > ul > li')

    def get_timetable(movie):
        tuples = []
        timetables = movie.select('div > div.type-hall > div.info-timetable > ul > li')
        for timetable in timetables:
            time = timetable.select_one('a > em').get_text()
            seat = timetable.select_one('a > span').get_text()
            tuple = (time, seat)
            tuples.append(tuple)
        return tuples

    data = {}
    for movie in movies:
        title = movie.select_one('div > div.info-movie > a > strong').get_text().strip()
        timetable = get_timetable(movie)

        data[title] = timetable

    return dumps(data)
