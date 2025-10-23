import './AppContent.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Calculator from '../calculator/Calculator'
import Workout from '../workout/Workout';
import Recipe from '../recipe/Recipe';
import Nutrition from '../nutrition/Nutrition';
import Login from '../login/Login';

const AppContent = () => {
    const location = useLocation();

    const renderContent = () => {
        switch (location.pathname) {
            case '/calculator':
                return <Calculator />;
            case '/workout':
                return <Workout />;
            case '/recipe':
                return <Recipe />;
            case '/nutrition':
                return <Nutrition />;
            case '/login':
                return <Login />;
            case '/':
                return <Calculator />; // Default to Calculator
            default:
                return <div>404 - Page not found</div>;
        }
    };

    return (
        <div className="app-container">
            <Navbar />
            <main className="content-area">
                {renderContent()}
            </main>
        </div>
    );
}

export default AppContent
