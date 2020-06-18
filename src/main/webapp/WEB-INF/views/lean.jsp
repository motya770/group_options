<%@ page session="false" %>
<%@ page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>

<style type="text/css">
    .wrapper {
    . make-row();
    }

    .content-main {
    . make-lg-column(8);
    }

    .content-secondary {
    . make-lg-column(3);
    . make-lg-column-offset(1);
    }
</style>

<t:sitepage>
    <jsp:body>
        <div class="main-container panel">
            <div class="wrapper">
                <div class="content-main">В Лос-Анджелесе прошла церемония награждения премией «Золотая малина», которой
                    отмечаются худшие образцы кинематографического искусства. Худшей актрисой стала Кэмерон Диаз за две
                    роли — в фильмах «Другая женщина» и «Домашнее видео: Только для взрослых». Звание худшего режиссера
                    досталось американцу Майклу Бэю за «Трансформеры 4: Эпоха
                </div>
                <div class="content-secondary">В Лос-Анджелесе прошла церемония награждения премией «Золотая малина»,
                    которой отмечаются худшие образцы кинематографического искусства. Худшей актрисой стала Кэмерон Диаз
                    за две роли — в фильмах «Другая женщина» и «Домашнее видео: Только для взрослых». Звание худшего
                    режиссера досталось американцу Майклу Бэю за «Трансформеры 4: Эпоха
                </div>
            </div>
        </div>
    </jsp:body>
</t:sitepage>