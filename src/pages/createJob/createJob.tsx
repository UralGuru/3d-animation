import { SubmitHandler, useForm } from 'react-hook-form';
import Layout from '../../components/layout/layout';
import styles from './createJob.module.css';
import { Job } from '../../constants/types';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import AuthPopup from '../../components/popups/auth/auth';
import { PaymentType } from '../../constants/enums';
import { postOrdersThunk } from '../../store/slices/orders.slice';

function CreateJob() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Job>();

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Job> = data =>
        dispatch(postOrdersThunk(data));

    const isAuth = useAppSelector(state => state.auth.isAuth);
    const [isOpenAuthPOpup, setOpenAuthPOpup] = useState(!isAuth);

    return (
        <div className={styles.container}>
            <Layout />

            <div className={styles.intro} />

            <div className={styles.main}>
                <h2>Создание заказа</h2>

                <div className={styles.employerCard}>
                    <form
                        className={styles.wrapper}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label>Укажите название задания</label>
                        <span className={styles.error}>
                            {errors.title && 'Обязательное поле'}
                        </span>
                        <input
                            type="text"
                            placeholder="Название задания"
                            {...register('title', {
                                required: true,
                            })}
                        />

                        <label>Выберите категорию задания</label>
                        <input
                            type="text"
                            placeholder="Выберите категорию"
                            {...register('categories')}
                        />

                        <label>Укажите адрес</label>
                        <input
                            type="text"
                            placeholder="Город, улица, дом"
                            {...register('address')}
                        />

                        <label>Укажите время начала выполнения задания</label>
                        <input
                            type="datetime-local"
                            {...register('startDateTime')}
                        />

                        <label>Укажите конечное выполнения задания</label>
                        <input
                            type="datetime-local"
                            {...register('endDateTime')}
                        />

                        <label>
                            Сколько человек требуется для выполнения задания
                        </label>
                        <span className={styles.error}>
                            {errors.limit && 'Обязательное поле'}
                        </span>
                        <input
                            type="number"
                            placeholder="Количество человек"
                            {...register('limit', {
                                required: true,
                            })}
                        />

                        <label>
                            Укажите примерное время выполнения в часах
                        </label>
                        <span className={styles.error}>
                            {errors.workHours && 'Обязательное поле'}
                        </span>
                        <input
                            type="number"
                            placeholder="Примерное время выполнения"
                            {...register('workHours', {
                                required: true,
                            })}
                        />

                        <label>Укажите размер оплаты</label>
                        <span className={styles.error}>
                            {errors.price && 'Обязательное поле'}
                        </span>
                        <input
                            type="number"
                            placeholder="Размер оплаты"
                            {...register('price', {
                                required: true,
                            })}
                        />

                        <label>Укажите тип оплаты</label>
                        <span className={styles.error}>
                            {errors.paymentType && 'Обязательное поле'}
                        </span>
                        <select
                            {...register('paymentType', {
                                required: true,
                            })}
                            defaultValue={PaymentType.Card}
                        >
                            <option value={PaymentType.Cash}>Наличные</option>
                            <option value={PaymentType.Card}>
                                Безналичные
                            </option>
                        </select>

                        <label> Уточните детали задания</label>
                        <textarea
                            {...register('description')}
                            placeholder="Подробное описание задания"
                            className={styles.input}
                        />

                        <label>Добавьте фото</label>
                        <input
                            type="file"
                            {...register('files')}
                            className={styles.input}
                        />

                        <label>
                            Перечислите через пробел необходимые навыки
                        </label>
                        <input
                            type="text"
                            placeholder="Навыки"
                            {...register('skills')}
                        />

                        <button type="submit">Опубликовать</button>
                    </form>
                </div>
            </div>
            <AuthPopup isOpen={isOpenAuthPOpup} setIsOpen={setOpenAuthPOpup} />
        </div>
    );
}

export default CreateJob;
