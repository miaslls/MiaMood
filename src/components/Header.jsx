import 'assets/CSS/Header.css';

import { useState } from 'react';
import { MoodService } from 'services/MoodService';
import { getDateToday } from 'util/getDateTimeNow';

import closeIcon from 'assets/ICON/icon-close.svg';
import calendar from 'assets/ICON/nav-icon-calendar.svg';
import add from 'assets/ICON/nav-icon-add.svg';
import list from 'assets/ICON/nav-icon-list.svg';
import home from 'assets/ICON/nav-icon-home.svg';

// 📌📌📌 function HEADER

function Header({
  setMoodList,
  getMoodList,
  setSelectedMoodList,
  setMoodListLoading,
  showSearch,
  setShowSearch,
  setSearchDate,
}) {
  const [selectedNavIcon, setSelectedNavIcon] = useState();

  const handleSearch = async (date) => {
    setMoodListLoading(true);

    setSearchDate(date);
    const [year, month, day] = date.split('-');

    const response = await MoodService.getMoodsByDate(year, month, day);

    setMoodList(response.moods);
    setMoodListLoading(false);
  };

  // 📌📌 HEADER RETURN
  return (
    <header>
      <div id="page-title">
        Mia<span>Mood</span>
      </div>

      <nav>
        {/* ----- 📌 SEARCH */}

        {showSearch && (
          <div id="search-date-container">
            <input
              id="search-date-input"
              type="date"
              defaultValue={getDateToday()}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />

            {/* ----- 📌 close search */}

            <div
              className="clickable"
              id="close-search-button"
              onClick={() => {
                setShowSearch(false);
                setSearchDate();
                setSelectedNavIcon('home');
                getMoodList();
              }}
            >
              <img src={closeIcon} alt="" />
            </div>
          </div>
        )}

        <div id="nav-icon-container">
          {/* ----- 📌 icon HOME */}

          <div
            className={`nav-icon clickable ${selectedNavIcon === 'home' && 'nav-icon-selected'}`}
            id="nav-icon-home"
            onClick={() => {
              setSelectedNavIcon('home');
              setSelectedMoodList('date');
              setShowSearch(false);
              setSearchDate();
            }}
          >
            <img src={home} alt="" />
          </div>

          {/* ----- 📌 icon SEARCH */}

          <div
            className={`nav-icon clickable ${selectedNavIcon === 'search' && 'nav-icon-selected'}`}
            id="nav-icon-search"
            onClick={() => {
              setSelectedNavIcon('search');
              setSelectedMoodList('date');
              setShowSearch(true);
            }}
          >
            <img src={calendar} alt="" />
          </div>

          {/* ----- 📌 icon LIST */}

          <div
            className={`nav-icon clickable ${selectedNavIcon === 'list' && 'nav-icon-selected'}`}
            id="nav-icon-all"
            onClick={() => {
              setSelectedNavIcon('list');
              setSelectedMoodList('all');
              setShowSearch(false);
              setSearchDate();
            }}
          >
            <img src={list} alt="" />
          </div>

          {/* ----- 📌 icon ADD */}

          <div
            className={`nav-icon clickable ${selectedNavIcon === 'add' && 'nav-icon-selected'}`}
            id="nav-icon-add"
            onClick={() => {
              setSelectedNavIcon('add');
              setShowSearch(false);
              setSearchDate();
            }}
          >
            <img src={add} alt="" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
