import { Outlet } from "react-router"

import Header from '../components/Header'
import Footer from '../components/Footer'

/**
 * Компонент `MainLayout`.
 * Основной макет приложения, включающий шапку, подвал и динамически подгружаемый контент.
 * Использует `Outlet` из `react-router` для отображения вложенных маршрутов.
 *
 * @component
 * @returns {JSX.Element} Разметка основного макета приложения.
 */
function MainLayout () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer/>
        </>
    )
}

export default MainLayout;