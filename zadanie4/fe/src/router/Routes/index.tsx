import { Navigate, Route, Routes } from 'react-router-dom'
import { Pathnames } from '../pathnames'
import { FC } from 'react'
import { publicRoutes } from '../routes'

export const RoutesComponent: FC = () => (
    <Routes>
        {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path='*' element={<Navigate to={Pathnames.main} replace />} />
    </Routes>
)