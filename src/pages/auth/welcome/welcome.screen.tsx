/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Emphasis } from '../../../components/Emphasis';
import { LoadingWrapper } from '../../../components/LoadingWrapper';
import { useIsRegisteredQuery } from '../../../generated/graphql';
import { useLazyQuery } from '../../../utils/useLazyQuery';
import { WelcomeForm } from './components/WelcomeForm';
import { IWelcomeFormData } from './components/WelcomeForm/WelcomeForm';

const WelcomeScreen = () => {
    const navigate = useNavigate();
    const [{ data, fetching, error }, checkRegistered] =
        useLazyQuery(useIsRegisteredQuery);
    const [email, setEmail] = useState<string>();

    useEffect(() => {
        if (error) return console.error(error);
        if (data) {
            if (data.userRegistered.exists) {
                return navigate('/auth/login', {
                    state: {
                        name: data.userRegistered.name,
                        email,
                    },
                });
            }
            return navigate('/auth/register');
        }
    }, [data, error]);

    const handleSubmit: SubmitHandler<IWelcomeFormData> = (input) => {
        setEmail(input.email);
        checkRegistered({
            email: input.email,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl text-center mb-10 text-black">
                Log in to
{' '}
<br />
                <Emphasis>DISTR</Emphasis>
            </h1>
            <LoadingWrapper loading={fetching}>
                <WelcomeForm onSubmit={handleSubmit} />
            </LoadingWrapper>
        </div>
    );
};
export default WelcomeScreen;
