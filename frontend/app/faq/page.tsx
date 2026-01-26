"use client";

import Accordion from "@/shared/ui/Accordion";
import Container from "@/shared/ui/Container";
import { useState } from "react";

function FAQ() {
  const [currentStatus, setCurrentStatus] = useState(1);

  return (  
    <Container className="mt-6">
      <div className="flex flex-col gap-4">
        <Accordion
          label="Для кого подойдут курсы?"
          className="bg-[#f7f7f7]"
          content={
            <>
              <p>
                Наши курсы подойдут ученикам 9–11 классов, выпускникам прошлых
                лет и абитуриентам, которые хотят:
              </p>
              <ul className="mt-2 list-disc list-inside ">
                <li>Подготовка к ЕНТ</li>
                <li>Пробные тесты</li>
                <li>Разбор ошибок</li>
              </ul>
            </>
          }
          status={currentStatus == 1}
          setStatus={() => setCurrentStatus(1)}
        />

        <Accordion
          label="Для кого подойдут курсы?"
          className="bg-[#f7f7f7]"
          content={
            <>
              <p>
                Наши курсы подойдут ученикам 9–11 классов, выпускникам прошлых
                лет и абитуриентам, которые хотят:
              </p>
              <ul className="mt-2 list-disc list-inside">
                <li>Подготовка к ЕНТ</li>
                <li>Пробные тесты</li>
                <li>Разбор ошибок</li>
              </ul>
            </>
          }
          status={currentStatus == 2}
          setStatus={() => setCurrentStatus(2)}
        />

        <Accordion
          label="Для кого подойдут курсы?"
          className="bg-[#f7f7f7]"
          content={
            <>
              <p>
                Наши курсы подойдут ученикам 9–11 классов, выпускникам прошлых
                лет и абитуриентам, которые хотят:
              </p>
              <ul className="mt-2 list-disc list-inside">
                <li>Подготовка к ЕНТ</li>
                <li>Пробные тесты</li>
                <li>Разбор ошибок</li>
              </ul>
            </>
          }
          status={currentStatus == 3}
          setStatus={() => setCurrentStatus(3)}
        />
      </div>
    </Container>
  );
}

export default FAQ;
