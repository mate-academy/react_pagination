import React from 'react';
import './WithInfo.css';

export const WithInfo = () => (
  <div className="container news">
    <p className="news__date">МАРТ 16, 2021</p>
    <h2>Бывший наркобарон обвинил президента Гондураса в коррупции</h2>
    <div className="news__main main">
      <img
        alt="person"
        className="main__image"
        src="https://gdb.voanews.com/1f8970ee-f9a6-4ab4-a363-b059d2a7a4ab_w1023_r1_s.jpg"
      />
      <p>
        Леонел Ривера заявил в суде, что президент Хуан Орландо Эрнандес
        <br />
        обманывал Управление США по борьбе с наркотиками
      </p>
    </div>
  </div>
);
